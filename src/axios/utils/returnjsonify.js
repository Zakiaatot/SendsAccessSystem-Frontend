export default {
    err: (error) => {
        console.log(error)
      return { code: 0, msg: error }
    },
    suc: (data) => {
      return { code: 1, msg: data }
    }
  }