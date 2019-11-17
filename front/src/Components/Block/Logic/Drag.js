const mouseHandler = (set) =>{
  const mousedown = (e) => {
    if(e.target.tagName !== 'path')
      return
    e.preventDefault()

    let currentPoint = {}
    currentPoint.x = e.target.getBoundingClientRect().x - e.target.ownerSVGElement.getBoundingClientRect().x
    currentPoint.y = e.target.getBoundingClientRect().y - e.target.ownerSVGElement.getBoundingClientRect().y

    set({
      x: currentPoint.x,
      y: currentPoint.y
    });

    let startPoint = {}
    startPoint.x = e.clientX - currentPoint.x
    startPoint.y = e.clientY - currentPoint.y

    const mousemove = (e) => {
      e.preventDefault()
      set({
        x: e.clientX - startPoint.x,
        y: e.clientY - startPoint.y
      });
    };

    const mouseup = (e) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }
  return mousedown
}
export default mouseHandler