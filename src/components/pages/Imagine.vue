<template>
  <div class="home" style="padding: 3%">
    <p class="alert alert-danger" v-if="error">{{ error }}</p>
    <form @submit.prevent="submit()" action="">
      <label v-if="!$store.state.language" for="">Please Add Your Text Here:</label>
      <label v-if="$store.state.language" for="">متن خود را وارد کنید</label>
      <textarea style="border-radius: 30px;" cols="8" rows="6" type="text" v-model="text" class="form-control"
        required></textarea><br>
      <div style="width: 100%" id="uploads">
        <input @change="upload(1)" type="file" id="file1" style="float: left; margin: 5px">
        <input @change="upload(2)" hidden type="file" id="file2" style="float: left; margin: 5px">
        <input @change="upload(3)" hidden type="file" id="file3" style="float: left; margin: 5px">
        <input @change="upload(4)" hidden type="file" id="file4" style="float: left; margin: 5px">
      </div>
      <div style="clear:both"></div>


      <hr v-if="addedoption.length">
      <div style="clear:both"></div>
      <br v-if="addedoption">
      <div style="width: 90%; margin: auto">
        <div @click="removeoption(item)" v-for="item in addedoption" v-bind="item" style="" class="card options">
          <div style="width: 100%; height:60%">
            <img loading="lazy" :src="item.get_image" style="width: 100%; height:100%" alt="">
          </div>
          <div style="width: 100%;height: 39%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
        <div style="clear:both"></div>
        <hr v-if="addedparams.length">
        <div v-for="item in addedparams" v-bind="item" class="card  options" style="height: unset">

          <div style="width: 100%; padding: 3%">
            <h5 @click="removeparams(item)" style="width: 100%; text-align: left; color: red; cursor: pointer">X</h5>
            <h5>{{ item.title }}</h5>
          </div>
          <div style="width: 100%;">
            <label for="">Weight: (In Range({{ item.minimum }}, {{ item.maximum }}))</label>
            <input
              @change="if (item.default > item.maximum) { item.default = item.maximum }; if (item.default < item.minimum) { item.default = item.minimum }"
              class="form-control" step="any" type="number" :min="item.minimum" :max="item.maximum"
              v-model="item.default">
          </div>
        </div>
      </div>

      <div style="clear:both"></div>

      <div style="clear:both"></div>
      <hr v-if="addedoption.length">
      <br><br><br><br>




      <div style="clear:both"></div>
      <button type="button" class="btn btn-light form-control" style="margin: 5px" v-if="ImageDetails.length"
        @click="ImageDetailsO = !ImageDetailsO" for="">Base
        image for details
        and
        styles</button>
      <div style="clear:both"></div>
      <br v-if="ImageDetailsO">
      <div style="width: 90%; margin: auto" v-if="ImageDetailsO">
        <div @click="addoption(item)" v-for="item in ImageDetails" v-bind="item"
          :style="[addedoption.includes(item) ? { background: 'lightgrey' } : { background: 'white' }]"
          class="card options">
          <div style="width: 100%; height:60%">
            <img loading="lazy" :src="item.get_image" style="width: 100%; height:100%" alt="">
          </div>
          <div style="width: 100%;height: 39%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>




      <div style="clear:both"></div>
      <button type="button" class="btn btn-light form-control" style="margin: 5px" v-if="AddDetails.length"
        @click="AddDetailsO = !AddDetailsO" for=""> Add
        details
        and
        styles</button>
      <div style="clear:both"></div>
      <br v-if="AddDetailsO">
      <div style="width: 90%; margin: auto" v-if="AddDetailsO">
        <div @click="addoption(item)" v-for="item in AddDetails" v-bind="item" style="" class="card options">
          <div style="width: 100%; height:60%">
            <img loading="lazy" :src="item.get_image" style="width: 100%; height:100%" alt="">
          </div>
          <div style="width: 100%;height: 39%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>




      <div style="clear:both"></div>
      <button type="button" class="btn btn-light form-control" style="margin: 5px" v-if="Mimic.length"
        @click="MimicO = !MimicO" for="">Mimic the style of
        an
        artist</button>
      <div style="clear:both"></div>
      <br v-if="MimicO">
      <div style="width: 90%; margin: auto" v-if="MimicO">
        <div @click="addoption(item)" v-for="item in Mimic" v-bind="item" class="card options">
          <div style="width: 100%; height:60%">
            <img loading="lazy" :src="item.get_image" style="width: 100%; height:100%" alt="">
          </div>
          <div style="width: 100%;height: 39%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>



      <div style="clear:both"></div>
      <button type="button" class="btn btn-light form-control" style="margin: 5px" v-if="parameters.length"
        @click="parametersO = !parametersO" for="">Midjourney
        parameters</button>
      <div style="clear:both"></div>
      <br v-if="parametersO">
      <div style="width: 90%; margin: auto" v-if="parametersO">
        <div @click="addparams(item)" v-for="item in parameters" v-bind="item" class="card parclass">

          <div style="width: 100%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
          <div style="width: 100%;">
            <label for="" style="font-size: 10px">Weight: (In Range({{ item.minimum }}, {{ item.maximum }}))</label>
            <input
              @change="if (item.default > item.maximum) { item.default = item.maximum }; if (item.default < item.minimum) { item.default = item.minimum }"
              class="form-control" step="any" type="number" :min="item.minimum" :max="item.maximum"
              v-model="item.default">
          </div>
        </div>
      </div>
      <div style="clear:both"></div>



      <div style="clear:both"></div>
      <button type="button" class="btn btn-light form-control" style="margin: 5px" v-if="sizes.length"
        @click="sizesO = !sizesO" for="">
        Image size
        helper</button>
      <div style="clear:both"></div>
      <br v-if="sizesO">
      <div style="width: 90%; margin: auto" v-if="sizesO">
        <div @click="addoption(item)" v-for="item in sizes" v-bind="item" class="card options">
          <div style="width: 100%; height:60%">
            <img loading="lazy" :src="item.get_image" style="width: 100%; height:100%" alt="">
          </div>
          <div style="width: 100%;height: 39%; padding: 3%">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <br><br><br><br>
      <div style="position: fixed; left: 0 ; bottom: 0; width: 100%; padding: 5%; background: #fed001">
        <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br>
        <button id="submit" class="btn btn-dark">Submit</button>
      </div>
    </form>
  </div>
  <div style="height: 200px;width: 100%"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      text: '',
      balance: '',
      urls: [],
      error: '',
      addedoption: [],
      addedparams: [],
      ImageDetails: [],
      ImageDetailsO: false,
      AddDetails: [],
      AddDetailsO: false,
      Mimic: [],
      MimicO: false,
      parameters: [],
      parametersO: false,
      sizes: [],
      sizesO: false,
    }
  },
  mounted() {
    this.get_balance()
    this.get_ImageDetails()
    this.get_AddDetails()
    this.get_Mimic()
    this.get_Parameters()
    this.get_Sizes()
  },
  methods: {
    addoption(item) {
      if (!this.addedoption.includes(item)) {
        this.addedoption.push(item)
      }
    },
    addparams(item) {
      if (!this.addedparams.includes(item)) {
        this.addedparams.push(item)
      }
    },
    removeoption(item) {
      if (this.addedoption.includes(item)) {
        const index = this.addedoption.indexOf(item);
        if (index > -1) { // only splice array when item is found
          this.addedoption.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    },
    removeparams(item) {
      if (this.addedparams.includes(item)) {
        const index = this.addedparams.indexOf(item);
        if (index > -1) { // only splice array when item is found
          this.addedparams.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    },
    async upload(id) {
      if (id !== 4) {
        document.getElementById('file' + (id + 1)).hidden = false
      }
      document.getElementById('submit').disabled = true
      document.getElementById('submit').innerHTML = 'Uploading'
      this.urls[id - 1] = 'busy'
      const formdata = new FormData()
      var img = document.getElementById('file' + id).files[0]
      formdata.append('image', img, img.name)
      await axios
        .post(`/image`, formdata)
        .then(response => response.data)
        .then(response => {
          this.urls[id - 1] = (response.get_image)
          if (!('busy' in this.urls)) {
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
          }
        })

    },
    async get_balance(id) {
      await axios
        .get(`/charge`)
        .then(response => response.data)
        .then(response => {
          this.balance = response
        })

    },
    async get_ImageDetails(id) {
      await axios
        .get(`/image-details`)
        .then(response => response.data)
        .then(response => {
          this.ImageDetails = response
        })

    },
    async get_AddDetails(id) {
      await axios
        .get(`/add-details`)
        .then(response => response.data)
        .then(response => {
          this.AddDetails = response
        })

    },
    async get_Mimic(id) {
      await axios
        .get(`/mimic`)
        .then(response => response.data)
        .then(response => {
          this.Mimic = response
        })

    },
    async get_Parameters(id) {
      await axios
        .get(`/parameters`)
        .then(response => response.data)
        .then(response => {
          this.parameters = response
        })

    },
    async get_Sizes(id) {
      await axios
        .get(`/sizes`)
        .then(response => response.data)
        .then(response => {
          this.sizes = response
        })

    },
    async get_image(id) {

      await axios
        .get(`/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {
          if (!response.imageUrl) {
            setTimeout(() => {
              this.get_image(id)
            }, 2000);
          }
          else {
          }
        })

    },
    async submit() {
      this.error = ''
      document.getElementById('submit').disabled = true
      document.getElementById('submit').innerHTML = 'Building...'
      if (this.balance === 0) {
        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Please Charge Your Account First</h5>`)
        setTimeout(() => {
          const toPath = this.$route.go || '/charge'
          this.$router.push(toPath)
        }, 2000);
        return false
      }
      var urls = ''
      for (var item of this.urls) {
        urls = urls + item + '\n'
      }
      this.text = urls + this.text

      for (var items of this.addedoption) {
        this.text = this.text + ' ' + items.prompt
      }

      for (var items of this.addedparams) {
        this.text = this.text + ' ' + items.prompt + ' ' + items.default
      }
      await axios
        .post('/imagine', { text: this.text })
        .then(response => response.data)
        .then(response => {
          document.getElementById('submit').disabled = false
          document.getElementById('submit').innerHTML = 'Submit'
          window.location.href = '/imagine/' + response['code'];
        }).catch(error => {
          this.error = error.response.data
          document.getElementById('submit').disabled = false
          document.getElementById('submit').innerHTML = 'Submit'
        })

    }
  }
}
</script>
<style>
.options {
  width: 16%;
  height: 20rem;
  margin: 0.3%;
  float: left
}

.parclass {
  width: 31.3%;
  margin: 1%;
  float: left
}

@media only screen and (max-width: 800px) {
  .options {
    width: 32%;
    height: 20rem;
    margin: 0.6%;
    float: left
  }

  .parclass {
    width: 48%;
    margin: 1%;
    float: left
  }
}


@media only screen and (max-width: 500px) {
  .options {
    width: 49%;
    height: 20rem;
    margin: 0.4%;
    float: left
  }


}
</style>