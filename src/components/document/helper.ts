import PDFParser from 'pdf-parse';
import multer from 'multer';
import path from 'path';

const ignore =
  /( ésta | sólo | cada | sean | será | tiene | estar | haber | hayan | otros | qué | ser | esta | les | son | fue | - | a | ante | bajo | cabe | con | contra | de | desde | durante | en | entre | excepto | hacía | hasta | mediante | para | por | según | sin | so | sobre | tras | y | o | ni | que | aunque | porque | como | si | cuando | mientras | después | antes | entonces | así | donde | sino | pues | ya | tal | cual | cuanto | quien | comoquiera | puesto | luego | tanto | sea | no | obstante | embargo | el | la | lo | los | las | un | una | unos | unas | pero | ademas | del | sus | este | está | más | sus | e | su | al | u | se )/gi;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/components/document/uploads/`);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  }
});

const extractContent = async (buf: Buffer) => {
  const parsedData = await PDFParser(buf);
  return parsedData.text;
};

const frequency = async (data: string) => {
  data = data.trim();
  data = data.replaceAll(/[(|)|[|\]|,|.|:|;|"|'|_]/g, '');
  data = data.replaceAll(/\s+/g, ' ');
  data = data.replaceAll(ignore, '');
  const dataList = data.split(' ');
  const occurrences = countOccurrences(dataList);

  const entries = Array.from(occurrences.entries()).slice(0, 10);
  const newOccurrences: { word: string; frequency: number }[] = [];
  entries.forEach(([k, e]) => {
    newOccurrences.push({ word: k, frequency: e });
  });

  return newOccurrences;
};

const countOccurrences = (arr: string[]): Map<string, number> => {
  const occurrences = arr.reduce((acc, element) => {
    acc.set(element.toLowerCase(), (acc.get(element.toLowerCase()) || 0) + 1);
    return acc;
  }, new Map<string, number>());

  const sortedMap = new Map<string, number>(
    Array.from(occurrences).sort((a, b) => {
      // Compare the values for sorting
      if (a[1] > b[1]) {
        return -1;
      } else if (a[1] < b[1]) {
        return 1;
      }
      return 0;
    })
  );

  return sortedMap;
};

export { storage, frequency, extractContent };
