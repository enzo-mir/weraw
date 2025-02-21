import Dialog from '~/components/dialog'
import style from '#css/guard.module.css'
import { ProfilesType } from '~/utils/types/profiles.type'
import { useState } from 'react'
import NewProfile from '~/components/client/new_profile'
import arrowRight from '#assets/icons/down_arrow.svg'
import { optionColor } from '~/utils/static/option_color'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

const Guard = ({
  galeryName,
  profiles,
  _csrf,
}: {
  galeryName: string
  profiles: ProfilesType
  _csrf: string
}) => {
  const [newProfile, setNewProfile] = useState(false)

  const url = location.origin + usePage().url.replace('/guard', '')

  const colors = optionColor.filter((color) => {
    return !profiles.some((profile) => profile.color.includes(color.value))
  })

  function handlLoadSession(name: string, color: string) {
    fetch(`${url}/load_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({ _csrf, name, color }),
    })
      .then((data) => {
        router.visit(data.url)
      })
      .catch(() => {
        toast.error('Le profil ne peut pas charger')
      })
  }

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
                    <button onClick={() => handlLoadSession(profile.name, profile.color)}>
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
