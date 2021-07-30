import 'sticky-sidebar-v2';
import '../libs/resizeSensor';

export default function sticky(){
  let $sticky = document.querySelectorAll('.js-sticky-sidebar');

  window.sidebar = [];

  if(!$sticky){return}
  
  $sticky.forEach((el,ind)=>{
    window.sidebar.push(
      new StickySidebar(el, {
          resizeSensor: true,
          topSpacing: 30,
          bottomSpacing: 0,
          minWidth: 1100
      })
    )

  })

}