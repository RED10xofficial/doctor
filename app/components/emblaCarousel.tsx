'use client';
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'

import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';
import AutoScroll from 'embla-carousel-auto-scroll'

interface Testimonial {
  name: string;
  comment: string;
}

type PropType = {
  slides: Testimonial[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true,speed: 1, stopOnMouseEnter: true , stopOnInteraction: false, startDelay:0})
  ])
  

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item,index) => (
            <div className="embla__slide border border-gray-200 rounded-lg p-4 mx-2 !w-52 bg-white" key={index}>
              <div>
                <h4>{item.comment}</h4>
                <p className='text-sm text-gray-500 font-bold mt-4'>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
