# Artonomous

Artonomous is a self-sustaining, self-improving, autonomous artist.

The premise is that it sells generative art as an ERC721 NFT.

## A Single, Shifting Generator:

Users can add generators to the Generator Registry by submitting the code for the generator. SOUL owners are able to stake their SOUL to a generator (and withdraw at any time). When an auction begins, the generator with the most SOUL staked on it is used to create the artwork.

The owner of a generator receives 1/3 of the DAI paid for the piece. The rest of the payment is split between the SOUL pool and a beneficiary (charity).

## Generators

A generator is a piece of software that takes in a specific input and always generates the same artwork.

Such an example is: https://mattdesl.svbtle.com/generative-art-with-nodejs-and-canvas.

## 24 Hour Art Auctions

Each auction lasts at most 24 hours. The auction starts at a price determined by the previous auction and decays lineraly over 24 hours. After 24 hours, the art can be claimed by anyone for free (minus tx fees).

When art is bought or claimed, a new auction begins immediately

## Curved Bonds & Generator Engines

The art bot thrives on a curved bond (https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5).

At any point someone can buy (with DAI) a SOUL token whose price is calculated based on the current supply of SOUL tokens. The more soul tokens that are in circulation, the higher the price of the new soul tokens. The DAI used to buy the soul token is also deposited and owned by the autonomous artist. A SOUL token can at any point be destroyed for access to the DAI in the communal pool.

Buying SOUL tokens with DAI, allows holders to stake their SOUL tokens towards specific generators on their own curved bonds. When this happens, a generator starts its lifecycle. If no SOUL tokens are staked to a generator, it goes offline and can't sell anymore art. In a hardcoded generator, there's only ever one generator to stake towards. In a shifting generator, you can stake to multiple generators, but only the top generator would be allowed to auction artwork. In multiple generators, multiple auctions would occur simultaneously.

When an art piece is sold by a generator, that DAI is used to buy SOUL tokens is split into thirds and deposited to:

1. the owner of the generator that made the art
2. the curved bond pool
3. a beneficiary (likely to be a charity)

Thus: as generators sell art, the overall ETH the autonomous artist owns increases. Successful generators earn more SOUL tokens.

BANCOR formulas are used to derive the price of the tokens.

## ERC721

Every art piece conforms to the ERC721 Non-Fungible Token standard allowing it to be easily sold and transferred.

Every art piece contains two core components. The hash of the generator & the block number of the start of its creation auction. Clients would use the block hash of that block as the input for the generator.

## Developing Locally

Contracts are already deployed on Rinkeby, so if you want to use that, simply run `yarn start` from the `/packages/front-end` directory and set your metamask network to Rinkeby.

If you want to use a local blockchain, follow instructions below.

To build contracts, deploy them to ganache locally, and copy them into the front-end package so they can be accessed there simply run `yarn preparelocal` from the root directory (with ganache running in another terminal).

Then run `yarn start` from the `/packages/front-end` directory.

## Licensing

It's imperative that the software used to generate the art is permissively licensed.

This code is ideally licensed as MIT.

## Thanks & Inspiration

Here's the original post. https://medium.com/@simondlr/lets-summon-an-autonomous-artist-a-bot-that-creates-owns-and-sells-its-own-art-ada1afad086a. Thanks to Trent McConaghy & Greg McMullen with whom Simon initially had this discussion with back in 2016 to create such an experiment.
