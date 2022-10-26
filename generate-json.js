import { randomUUID } from "crypto";
import { promises } from "fs";
import { posix, resolve, sep } from "path";
const { readdir, readFile, writeFile } = promises;

const dir = "./glossary";
const outputFilePath = "src/data.json";

/**
 * @param {string} dir
 */
async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  for await (const filePath of getFiles(dir)) {
    const file = await readFile(filePath, "utf8");
    await addTerm(file);
    await addCategory(filePath);
  }

  const output = {
    categories: categories,
    terms: terms,
  };
  await writeFile(outputFilePath, JSON.stringify(output, null, 2));
})();

const terms = [];

/**
 * @param {string} file
 */
async function addTerm(file) {
  const title = file.match(/(?<=# ).*/)[0];

  let term = {
    definitions: [
      // {
      //   description: "Computer Emergency Readiness Team",
      //   source: {
      //     name: "NIST",
      //     url: "https://csrc.nist.gov/glossary/term/cert",
      //   },
      // },
    ],
  };

  const i = terms.findIndex((t) => t.term === title);

  const _s = file.split(/#+\sDescription\s/)[1];
  let [description, sourceStr] = _s.split(/#+\sSource\s/);
  const sourceName = sourceStr.match(/\[.+\]/)[0].replace(/[\[\]]/g, "");
  const sourceUrl = sourceStr.match(/\(.+\)/)[0].replace(/[\(\)]/g, "");
  const source = { name: sourceName, url: sourceUrl };

  if (i === -1) {
    term.term = title;
    term.definitions.push({ description, source });
    terms.push(term);
  } else {
    terms[i].definitions.push({ description, source });
  }
}

const categories = [];

/**
 * @param {string} filePath
 */
async function addCategory(filePath) {
  const dirPosix = dir.split(sep).join(posix.sep);
  const filePathPosix = filePath
    .split(sep)
    .join(posix.sep)
    .replace(dirPosix, "")
    .slice(1);

  const [parentCategory, term] = filePathPosix
    .split("/")
    .slice(-3)
    .slice(0, -1);

  const categoriesTemp = filePathPosix.split("/").slice(0, -2);

  categoriesTemp.forEach((categoryName) => {
    const i = categories.findIndex((c) => c.name === categoryName);
    if (i === -1) {
      categories.push({ name: categoryName, id: randomUUID(), parent: null });
    }
  });
  categoriesTemp.forEach((categoryName, i) => {
    if (i === 0) return;
    const j = categories.findIndex((c) => c.name === categoryName);
    const k = categories.findIndex((c) => c.name === categoriesTemp[i - 1]);
    categories[j].parent = categories[k].id;
  });

  const parentCategoryId = categories.filter(
    (c) => c.name === parentCategory
  )[0];

  const termId = terms.findIndex(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );
  terms[termId].category = parentCategoryId.id;
}
