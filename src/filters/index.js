import Vue from 'vue'
import filterSample from './sample'

Vue.filter('filterSample', filterSample)
const participantsType = (val) => {
  switch (val) {//仲裁类别
    case 1: {
      return '个人';
    }
    case 2: {
      return '企业';
    }
  }
};

export default {
  participantsType,
}
