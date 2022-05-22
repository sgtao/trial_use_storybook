const app = Vue.createApp({
  data: () => ({ // define binded data
    items: null,
    keyword: '',
    message: ''
  }),
  watch: { // define watched data
    keyword: function (newKeyword, oldKeyword) {
      console.log(newKeyword)
      this.message = 'Waiting for you to stop typing...'
      // 入力の遅延
      this.debouncedGetAnswer()
    }
  },
  mounted: function () { // define first process at mount
    this.keyword = 'Vue3'
    this.getAnswer()
    // 
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 2000)
  },
  methods: { // define methods 
    // APIからデータを取得する
    getAnswer: function () {
      // 検索キーワードが空だと終了、短すぎても
      if (this.keyword === '') {
        console.log('blank keyword')
        this.item = null
        return
      } else if (this.keyword.length < 3) {
        console.log('too short')
        this.item = null
        return
      }
      // 入力されていたら、メッセージを設定し、APIを実行
      // refer to Qiita : https://qiita.com/api/v2/docs
      // データ取得は、`GET /api/v2/items?page=1&per_page=20 HTTP/1.1`
      this.message = 'Loading...'
      const vm = this
      const params = { page: 1, per_page: 20, query: this.keyword }
      const acc_url = 'https://qiita.com/api/v2/items?'
      axios.get(acc_url, { params })
        .then(function (res) { // レスポンスが返ったとき
          console.log(res) 
          vm.items = res.data
        })
        .catch(function (error) { // エラー発生時、
          vm.message = 'Error! ' + error // 
        })
        .finally(function () { // 全処理終了時、
          vm.message = '' // メッセージを空にする
        })
    },
  }
})
app.mount('#app')