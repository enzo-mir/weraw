export const changeDone = async (value: boolean, _csrf: string, urlId: number) => {
  const data = await fetch('/url/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      value,
      _csrf,
      urlId,
    }),
  })

  return data
}
