"use client";
import checkImage from "assets/icons/check.png";
import arrowLink from "assets/icons/arrow_link.png";
import Image from "next/image";
import waterPink from "assets/images/water_pink.png";
import starEye from "assets/images/star_eye.png";
import star from "assets/images/star.png";
import style from "css/home.module.css";
import { useState } from "react";
import { urlSchema } from "./utils/types/url.type";
import { ZodError } from "zod";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const submitUrl = () => {
    try {
      const isValidUrl = urlSchema.parse(url);
      console.log(isValidUrl);
    } catch (error) {
      if (error instanceof ZodError) console.log(error.issues[0].message);
    }
  };

  return (
    <main className={style.main}>
      <div className={style.text_side}>
        <h1>
          Welcome,
          <br />
          Bienvenue,
          <br />
          Bienvenido,
          <br />
          <em>to WeRaw</em>
        </h1>
        <p>
          Votre espace dédié à la prévisualisation
          <br /> de votre shooting photo.
        </p>
        <section className={style.url_section}>
          <h2>
            Rentrez votre url <em>WeRaw</em>
          </h2>
          <Image src={arrowLink} alt="Arrow link icon" width={30} />
          <div>
            <input type="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} name="weraw_url" />
            <button onClick={submitUrl}>
              <Image src={checkImage} alt="Check icon" width={25} height={25} />
            </button>
          </div>
        </section>
      </div>
      <aside className={style.aside}>
        <Image src={waterPink} alt="Water pink image" width={500} objectFit="cover" />
        <Image src={star} alt="Star image" width={275} />
        <div className={style.square}></div>
        <Image src={starEye} alt="Star eye image" width={550} />
      </aside>
    </main>
  );
}
