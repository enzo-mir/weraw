import Dialog from '~/components/dialog'
import style from '#css/guard.module.css'
import { ProfilesType } from '~/utils/types/profiles.type'
import { useState } from 'react'
import NewProfile from '~/components/client/new_profile'
import arrowRight from '#assets/icons/down_arrow.svg'
import { optionColor } from '~/utils/static/option_color'

const Guard = ({ galeryName, profiles }: { galeryName: string; profiles: ProfilesType }) => {
  const [newProfile, setNewProfile] = useState(false)

  const colors = optionColor.filter((color) => {
    return !profiles.some((profile) => profile.color.includes(color.value))
  })

  return (
    <Dialog>
      <main className={style.container}>
        <h2>
          Profil pour la galerie <span>{galeryName}</span>
        </h2>

        <div>
          {profiles.length ? (
            <>
              <ul className={style.profiles}>
                {profiles.map((profile, index) => (
                  <li key={index}>
                    <button>
                      <p>{profile.name}</p>
                      <span style={{ backgroundColor: profile.color }}></span>
                      <img src={arrowRight} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
              {newProfile ? <NewProfile colors={colors} setNewProfile={setNewProfile} /> : null}
            </>
          ) : newProfile ? (
            <NewProfile colors={colors} setNewProfile={setNewProfile} />
          ) : (
            <p>Aucun profil n'a été trouvé pour cette galerie</p>
          )}

          {profiles.length >= 8 ? null : (
            <button onClick={() => setNewProfile(!newProfile)}>Créer un profil</button>
          )}
        </div>
        <sub>Profil(s) enregistré(s) : {profiles.length} / 8</sub>
      </main>
    </Dialog>
  )
}

export default Guard
