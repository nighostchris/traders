/* eslint-disable import/prefer-default-export, implicit-arrow-linebreak, no-return-assign */

// prettier-ignore
export const streamToString = (stream: NodeJS.ReadableStream): Promise<string> => {
  let chunks: string = '';

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks += chunk);

    stream.on('error', (error) => reject(error));

    stream.on('end', () => resolve(chunks));

    stream.resume();
  });
};
