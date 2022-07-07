import classnames from 'classnames'
import Granim from 'granim'
import { ComponentPropsWithoutRef, FC, useRef } from 'react'

type AnimatedCanvasProps = ComponentPropsWithoutRef<'div'>

export const AnimatedCanvas: FC<AnimatedCanvasProps> = ({ className }) => {
    const animationRef = useRef<Granim>()

    return (
        <div className={classnames('', className)}>
            <canvas
                className="w-full h-full"
                ref={(element) => {
                    if (element && !animationRef.current) {
                        animationRef.current = new Granim({
                            element,
                            direction: 'left-right',
                            isPausedWhenNotInView: true,
                            states: {
                                'default-state': {
                                    gradients: [
                                        ['#A650E9', '#D80589'],
                                        ['#98CFF1', '#FFBF57'],
                                        ['#E52168', '#B575C7'],
                                    ],
                                },
                            },
                        })
                    }
                }}
            />
            <div className='absolute bottom-0 h-1/2 w-full  bg-gradient-to-t from-slate-50 to-transparent' />
        </div>
    )
}
