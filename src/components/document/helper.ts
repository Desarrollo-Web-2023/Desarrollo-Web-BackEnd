import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PDFParser from 'pdf-parse';
import Boom from '@hapi/boom';

// const ignore = [
//   'a',
//   'ante',
//   'bajo',
//   'cabe',
//   'con',
//   'contra',
//   'de',
//   'desde',
//   'durante',
//   'en',
//   'entre',
//   'excepto',
//   'hacía',
//   'hasta',
//   'mediante',
//   'para',
//   'por',
//   'según',
//   'sin',
//   'so',
//   'sobre',
//   'tras',
//   'y',
//   'o',
//   'ni',
//   'que',
//   'aunque',
//   'porque',
//   'como',
//   'si',
//   'cuando',
//   'mientras',
//   'después',
//   'antes',
//   'entonces',
//   'así',
//   'donde',
//   'sino',
//   'pues',
//   'ya',
//   'tal',
//   'cual',
//   'cuanto',
//   'quien',
//   'comoquiera',
//   'puesto',
//   'luego',
//   'tanto',
//   'sea',
//   'no',
//   'obstante',
//   'embargo',
//   'el',
//   'la',
//   'lo',
//   'los',
//   'las',
//   'un',
//   'una',
//   'unos',
//   'unas',
//   'pero',
//   'ademas'
// ];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/components/document/uploads/`);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  }
});

const readFile = async (docPath: string) => {
  fs.readFile(docPath, async (err, buf) => {
    if (err) {
      throw Boom.unsupportedMediaType('Unsupported data type');
    }

    const data = await extractContent(buf);
    frequency(data);
  });
};

const extractContent = async (buf: Buffer): Promise<string> => {
  const parsedData = await PDFParser(buf);
  return parsedData.text;
};

const frequency = async (data: string) => {
  data = data.trim();
  console.log(data.length);
  data = data.replaceAll(/[(|)|[|\]|,|.|:|;|"|']/g, '');
  console.log(data.length);
  data = data.replaceAll(/\s+/g, ' ');
  console.log(data.length);
  const dataList = data.split('\n');
  console.log(dataList.length);
  console.log(data.slice(0, 200));
};

export { storage, readFile, frequency };
