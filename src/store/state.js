const nowTabData = localStorage.getItem('nowTabData') ? JSON.parse(localStorage.getItem('nowTabData')) : {}
const state = {
  toggleOnOff: true,
  nowTabData: nowTabData,
  columnList: [],
  Context: false,
  recommendDialog: false,
  outLoginDialogOnOff: false,
  loginOnOff: localStorage.getItem('adminId') ? localStorage.getItem('adminId') : '',
  userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : ''
}
export default state
