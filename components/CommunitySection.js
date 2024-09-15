// components/CommunitySection.js
'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function CommunitySection() {
  const memeUrls = [
    "https://media.discordapp.net/attachments/1237005495412461569/1284638303391453255/3.png?ex=66e75c26&is=66e60aa6&hm=97be83f6a4000ccfecac0081a57c665be7349eb0f87241496eba63b8ceaaa08f&=&format=webp&quality=lossless&width=940&height=940",
    "https://media.discordapp.net/attachments/1237005495412461569/1284638302389014579/2.png?ex=66e75c26&is=66e60aa6&h=94fd2d965871a1c1537eb2435cf1e0265173bfcc0192ff900adaa3b188fb1210&=&format=webp&quality=lossless&width=940&height=940",
    "https://media.discordapp.net/attachments/1237005495412461569/1284638301273198712/1.png?ex=66e75c26&is=66e60aa6&hm=2576e83607a52810b083dbe69d1169236c6178541ef66e3e3af2cbf2fcfe3865&=&format=webp&quality=lossless&width=940&height=940"
  ];

  return (
    <section id="community" className="relative py-24 bg-sky-400 dark:bg-sky-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-pink-800 dark:text-pink-300">Join the $PWIG Community</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {memeUrls.map((memeUrl, index) => (
            <motion.div
              key={index}
              className="relative group transform transition-transform hover:scale-105 hover:rotate-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={memeUrl}
                alt={`PWIG Meme ${index + 1}`}
                width={940}
                height={940}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <Button
                  className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white transform hover:scale-110 shadow-lg"
                  aria-label={`Share PWIG Meme ${index + 1}`}
                >
                  Share PWIG Meme
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
