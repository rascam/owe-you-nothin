const fetcher =  (url: string) => fetch(url).then((res) => {
  return res.json()
}).then(data => {

  return data
})

export default fetcher

