import color from 'https://cdn.jsdelivr.net/npm/color@4.2.3/+esm'

let textColor = color('#2c3e50')
let linkColor = color('#42b983')

/*export default {
  'popup': {
    position: "fixed",
    zIndex : 9998,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    transition: "opacity 0.3s ease",
    '& .__content': {
      width: "300px",
      margin: "auto",
      padding: "20px 30px",
      backgroundColor: "#fff",
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.33)",
      transition: "all 0.3s ease",
      '& .modal-header':{
        '& h3':{
          marginTop: 0,
          color: "#42b983",
        }
      },
      '& .modal-body':{
        margin: "20px 0"
      },
      '& .modal-footer':{
        '& .modal-default-button': {
          float: "right"
        }
      }
    }
  }
}*/

export default {
  'modal_mask': {
    position: "fixed",
    zIndex : 9998,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    transition: "opacity 0.3s ease",
    '& .modal-container': {
      width: "300px",
      margin: "auto",
      padding: "20px 30px",
      backgroundColor: "#fff",
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.33)",
      transition: "all 0.3s ease",
      '& .modal-header':{
        '& h3':{
          marginTop: 0,
          color: "#42b983",
        }
      },
      '& .modal-body':{
        margin: "20px 0"
      },
      '& .modal-footer':{
        '& .modal-default-button': {
          float: "right"
        }
      }
    }
  }
}
