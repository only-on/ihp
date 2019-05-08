<template>
  <span>
      <Select  style="width:100px;float:left" placeholder="省" @on-change="changeProvice" clearable v-model="pid" :label-in-value="true" >
        <Option v-for='(items, index) in region' :value='items.regionId' :key="index">{{items.regionName}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="市" @on-change="changeCity"  clearable v-model="cid" :label-in-value="true" >
        <Option v-for='(items, index) in regionCity' :value='items.regionId' :key="index">{{items.regionName}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="区县" @on-change="changeCountry"  clearable v-model="did" :label-in-value="true" >
        <Option v-for='(items, index) in regionCountry' :value='items.regionId' :key="index">{{items.regionName}}</Option>
      </Select>
      <Select  style="width:150px;float:left" placeholder="镇/街道" @on-change="changeTown"  clearable v-model="tid" :label-in-value="true" >
        <Option v-for='(items, index) in regionTown' :value='items.regionId' :key="index">{{items.regionName}}</Option>
      </Select>
  </span>
</template>

<script>
import { getRegion } from '../api/api'
export default {
  props: [
    'regionIds'
  ],
  data () {
    return {
      pid: '',
      cid: '',
      did: '',
      tid: '',
      param: {
        parentId: '1'
        // regionType: '1'
      },
      regions: [],
      region: [],
      regionCity: [],
      regionCountry: [],
      regionTown: []
    }
  },
  methods: {
    getTown () {
      this.param.parentId = this.did
      // this.param.regionType = 3
      getRegion(this.param).then((res) => {
        this.regionTown = res.data.content
      })
    },
    getCountry () {
      this.param.parentId = this.cid
      // this.param.regionType = 3
      getRegion(this.param).then((res) => {
        this.regionCountry = res.data.content
        this.getTown()
      })
    },
    getAllProvice (param) {
      getRegion(param).then((res) => {
        this.region = res.data.content
      })
    },
    changeProvice (change) {
      this.regions = []
      this.cid = ''
      this.did = ''
      this.tid = ''
      if (change !== '' && change !== undefined) {
        this.regions[0] = change
        this.param.parentId = change.value
        // this.param.regionType = 2
        getRegion(this.param).then((res) => {
          this.regionCity = res.data.content
        })
      } else {
        this.regions = []
        this.regionCity = []
        this.regionTown = []
      }
      this.$emit('region', this.regions)
    },
    changeCity (change) {
      this.did = ''
      this.tid = ''
      if (change !== '' && change !== undefined) {
        this.regions[1] = change
        this.param.parentId = change.value
        // this.param.regionType = 3
        getRegion(this.param).then((res) => {
          this.regionCountry = res.data.content
        })
      } else {
        this.regions.splice(1, 2)
        this.regionCountry = []
        this.regionTown = []
      }
      this.$emit('region', this.regions)
    },
    changeCountry (change) {
      this.tid = ''
      if (change !== '' && change !== undefined) {
        this.regions[2] = change
        this.param.parentId = change.value
        // this.param.regionType = 3
        getRegion(this.param).then((res) => {
          this.regionTown = res.data.content
        })
      } else {
        this.regions.splice(2, 1)
        this.regionTown = []
      }
      this.$emit('region', this.regions)
    },
    changeTown  (change) {
      if (change !== '' && change !== undefined) {
        this.regions[3] = change
      } else {
        this.regions.splice(3, 1)
      }
      this.$emit('region', this.regions)
    }
  },
  created: function () {
    this.getAllProvice(this.param)
  },
  watch: {
    regionIds: function () {
      this.pid = this.regionIds[0]
      this.cid = this.regionIds[1]
      this.did = this.regionIds[2]
      this.tid = this.regionIds[3]
      this.param.parentId = this.pid
      getRegion(this.param).then((res) => {
        this.regionCity = res.data.content
        this.getCountry(this.param)
      })
    }
  }
}
</script>

<style scoped>
</style>
