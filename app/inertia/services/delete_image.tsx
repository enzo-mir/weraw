export const deleteImageService = async (id: number, _csrf: string) => {
  const response = await fetch(`/image/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      _csrf,
    }),
  })
  console.log(response)

  return response
}
