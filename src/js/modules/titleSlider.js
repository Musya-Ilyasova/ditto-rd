import KeenSlider from 'keen-slider';

const titleSlider = () => {
  var slider = new KeenSlider(
    ".first-sc__slider",
    {
      loop: true,
      renderMode: "performance",
      drag: false,
      vertical: true,
      slides: {
        spacing: 5,
      },
      defaultAnimation: {
        duration: 1000,
      }
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.slides.forEach(item => item.style.display="");
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
}

export default titleSlider;
