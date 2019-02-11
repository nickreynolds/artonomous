export default function(ipfsHash) {
  const hash = ipfsHash.toLowerCase();
  let seed = 0.0;
  for (let i = 0; i < hash.length; i = i + 6) {
    seed += parseInt(hash.charAt(i), 16) / 16;
  }
  seed /= hash.length / 6;

  seed *= 10;

  const leftOfDecimal = parseInt(seed);

  seed -= leftOfDecimal;

  return seed;
}
