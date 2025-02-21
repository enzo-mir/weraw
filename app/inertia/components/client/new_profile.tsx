import style from '#css/guard.module.css'
import { useForm, usePage } from '@inertiajs/react'
import type { optionColor } from '../../utils/static/option_color'
import { useEffect, useRef } from 'react'
import { addProfileSchema } from '#schemas/add_profile.schema'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

const NewProfile = ({
  colors,
  setNewProfile,
}: {
  colors: typeof optionColor
  setNewProfile: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const baseUrl = usePage().url
  const selectorRef = useRef<HTMLSpanElement>(null)
  const targetColor = useRef<HTMLLIElement>(null)
  const { data, setData, post } = useForm({
    name: '',
    color: colors[0].value,
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await addProfileSchema.parseAsync(data)
      post(`${baseUrl}/profile`, {
        onSuccess: () => {
          toast.success('Profil ajouté avec succès', {
            autoClose: 2000,
          })
          setNewProfile(false)
        },

        onError: (error) => {
          console.log(error)

          if (error instanceof ZodError) {
            toast.error(error.issues[0].message, {
              autoClose: 2000,
            })
          } else {
            toast.error(error.message, {
              autoClose: 2000,
            })
          }
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message, {
          autoClose: 2000,
        })
      }
    }
  }

  useEffect(() => {
    selectorRef.current!.style.left = `${targetColor.current?.offsetLeft}px`
  }, [data.color])

  return (
    <form onSubmit={handleSubmit} className={style.new_profile}>
      <div>
        <label htmlFor="name">Nom du profil</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <ul className={style.color_picker}>
          {colors.map((color) => {
            return (
              <li
                key={color.id}
                className={data.color === color.value ? style.selected_color : undefined}
                ref={data.color === color.value ? targetColor : undefined}
              >
                <button type="button" onClick={() => setData({ ...data, color: color.value })}>
                  <span style={{ backgroundColor: color.value }}></span>
                </button>
              </li>
            )
          })}

          <span ref={selectorRef} className={style.selector}></span>
        </ul>
      </div>
      <button>Ajouter +</button>
    </form>
  )
}

export default NewProfile
