const buf1 = Buffer.alloc(20);

for (let i = 0; i < 10; i++) {
  buf1[i] = i;
}

const buf2 = Buffer.alloc(3, 'a');

const total = buf1.length + buf2.length;

const buf = Buffer.concat([buf1, buf2], total);

console.log(buf);



const str = '\u00bd+\u00bc=\u00be';

// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);