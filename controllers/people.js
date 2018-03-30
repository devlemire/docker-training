module.exports = {
   get(req, res) {
      const db = req.app.get('db')

      db
         .get_people()
         .then(results => {
            res.status(200).send(results)
         })
         .catch(err => {
            console.error('Massive failed at fetching people:', err)
            res.status(500).send(err)
         })
   },
   post(req, res) {
      const db = req.app.get('db')
      console.log('POST /api/people -', req.body)
      if (!req.body.name || !req.body.age) {
         res.status(409).send('Request did not have a name or age on the body.')
         return
      }

      db
         .create_person({
            name: req.body.name,
            age: req.body.age
         })
         .then(results => {
            res.status(200).send(results[0])
         })
         .catch(err => {
            console.error('Massive failed at creating a new person:', err)
            res.status(500).send(err)
         })
   },
   delete(req, res) {
      const db = req.app.get('db')
      if (!req.query.id) {
         res.status(409).send('Request did not have an id.')
         return
      }

      db
         .delete_person({
            id: req.query.id
         })
         .then(() => {
            res.status(200).send('ok')
         })
         .catch(err => {
            console.error('Massive failed at deleting a person:', err)
            res.status(500).send(err)
         })
   }
}
