<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='less'>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .ivu-btn-dashed:hover {
    color: #82C225 !important;
  }
  .ivu-btn:hover {
    /*color: #82C225 !important;*/
  }
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #82C225 !important;
    background-color: #82C225 !important;
  }
  .ivu-steps .ivu-steps-head {
    background: #fff !important;
  }
  .ivu-steps .ivu-steps-title {
    background: #fff !important;
  }
  .ivu-page-next:hover, .ivu-page-prev:hover {
    border-color: #82C225 !important;
  }
  .ivu-page-options-elevator input:hover {
    border-color: #82C225 !important;
  }
  .ivu-page-item-active{
    background-color: #82C225 !important;
    border-color: #82C225 !important;
  }
  .ivu-page-item:hover {
    border-color: #82C225 !important;
    color: #82C225 !important;
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover {
    background-color: #82C225 !important;
    border-color: #82C225 !important;
  }
  .ivu-btn-primary {
    background-color: #82C225 !important;
    border-color: #82C225 !important;
  }

  .ivu-radio-group-button .ivu-radio-wrapper{
    border-color: #dddee1 !important;
    border-left: 1px solid #dddee1 !important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
    color: #fff !important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    color: #fff !important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
    border-color: #48B089 !important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper:last-child {
    border-radius: 0 0 0 0 !important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper:first-child {
    border-radius: 0 0 0 0 !important;
  }
  .ivu-spin-dot {
    background-color: #48B089 !important;
  }
  .ivu-btn, .ivu-btn:active, .ivu-btn:focus{
    border-color: transparent !important;
    outline: none !important;
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
  }
  .ivu-radio-checked .ivu-radio-inner {
    border-color: #82C225 !important;
  }
  .ivu-radio-inner:after {
    background-color: #82C225 !important;
  }
  .ivu-radio-checked:hover .ivu-radio-inner {
    border-color: #82C225 !important;
  }
  .ivu-input:hover {
    border-color: #82C225 !important;
  }
  .ivu-select-selection-focused, .ivu-select-selection:hover {
    border-color: #82C225 !important;
  }
  .ivu-input:focus {
    border-color: #82C225 !important;
  }
  .file {
    float: left;
    position: relative;
    display: inline-block;
    background: #82C225;
    border: 1px solid #82C225;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #82C225;
    border-color: #82C225;
    color: #fff;
    text-decoration: none;
  }
  .ivu-btn-text.active, .ivu-btn-text:active {
    color: #82C225 !important;
  }
  .ivu-btn-text:hover {
    color: #82C225 !important;
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 1px;
    margin-bottom: 10px;
    text-align: center;
  }
  .pages-right {
    vertical-align: middle;
  }
  .ivu-input-group-append, .ivu-input-group-prepend{
    background-color: #00A47E;
    border: 1px solid #00A47E;
  }
  .ivu-page-item-active a, .ivu-page-item-active:hover a{
    color: #fff !important;
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover{
    color: #fff !important;
  }
  .ivu-input-number:hover {
    border: 1px solid #82C225 !important;
  }
  .ivu-input-number-handler-down-inner, .ivu-input-number-handler-up-inner:hover a{
    color: #82C225 !important;
  }
  .ivu-input-number-handler-up-inner, .ivu-input-number-handler-down-inner:hover a{
    color: #82C225 !important;
  }
  .selfClass .ivu-form-item-label:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
  }
  .ivu-input-number:focus{
    border-color: #82C225 !important;
  }
  .ivu-time-picker-cells-cell-selected, .ivu-time-picker-cells-cell-selected:hover{
    color:#82C225 !important;
  }
  .ivu-date-picker-cells-cell-selected em, .ivu-date-picker-cells-cell-selected:hover em{
    background:#82C225 !important;
  }
  .ivu-date-picker-cells-focused em{
    box-shadow: 0 0 0 1px #82C225 !important;
  }
  .ivu-date-picker-cells-cell-today em:after{
    background:#82C225 !important ;
  }
  .layout-footer-center{
    position: absolute;
    background-color: #005945 !important;
    text-align: center;
    right: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    font-size:14px;
    color: #fff;
    height: 60px;
    padding-top: 20px;
  }
  .selfClass .ivu-form-item-label:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
  }
</style>
