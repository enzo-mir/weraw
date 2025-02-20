export const deleteImageService = async (urls: Array<string>, _csrf: string) => {
  const response = fetch(`/image`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      urls,
      _csrf,
    }),
  })
  return await response
}
