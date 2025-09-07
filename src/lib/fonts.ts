import { Oxanium, Jaini_Purva, Poppins } from 'next/font/google';

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-oxanium'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-poppins'
});

const jainiPurva = Jaini_Purva({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jaini-purva'
});

export { oxanium, poppins, jainiPurva };
