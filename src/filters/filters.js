exports.statusName = (val) => {
    let statusName = '';
    switch (val) {
      case 0: {
        statusName = '已取消';
        break;
      }
      case 10: {
        statusName = '未付款';
        break;
      }
      case 20: {
        statusName = '已付款';
        break;
      }
    }
    return statusName;
  }
 