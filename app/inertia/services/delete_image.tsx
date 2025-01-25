export const deleteImageService = async (id: number, _csrf: string) => {
  const response = await fetch(`/admin/image/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      _csrf,
    }),
  })
  return response
}
