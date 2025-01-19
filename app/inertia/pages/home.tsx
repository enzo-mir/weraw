'use client'
import checkimg from '#assets/icons/check.png'
import arrowLink from '#assets/icons/arrow_link.png'
import waterPink from '#assets/images/water_pink.png'
import starEye from '#assets/images/star_eye.png'
import star from '#assets/images/star.png'
import style from '#css/home.module.css'
import { useState } from 'react'
import { urlSchema } from '#types/url.type'
import { ZodError } from 'zod'
import { Head } from '@inertiajs/react'

export default function Home() {
  const [url, setUrl] = useState<string>('')

  const submitUrl = async () => {
    try {
      urlSchema.parse(url)
    } catch (error) {
      if (error instanceof ZodError) {
      }
    }
  }

  return (
    <>
      <Head title="homepage" />
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
            <img src={arrowLink} alt="Arrow link icon" width={30} />
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.currentTarget.value)}
                name="weraw_url"
                required
                pattern="https://photos.weraw/*"
              />
              <button onClick={submitUrl}>
                <img src={checkimg} alt="Check icon" width={25} height={25} />
              </button>
            </div>
          </section>
        </div>
        <aside className={style.aside}>
          <img src={waterPink} alt="Water pink image" />
          <img src={star} alt="Star image" width={275} />
          <div className={style.square}></div>
          <img src={starEye} alt="Star eye image" width={550} />
        </aside>
      </main>
    </>
  )
}
