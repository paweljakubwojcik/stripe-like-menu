import { FC, ComponentPropsWithoutRef, ReactNode, useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import useResizeObserver from 'use-resize-observer'

type NavBarProps = ComponentPropsWithoutRef<'div'>

type MenuItem = { label: string; component: ReactNode }

const MENU_ITEMS: MenuItem[] = [
    { label: 'Products', component: <div className="h-[300px]">to ma wysokość 300px</div> },
    { label: 'Solutions', component: <div className="h-[400px]">to ma wysokość 400px</div> },
    { label: 'Developers', component: <div>'solutions'</div> },
    { label: 'Company', component: 'company' },
    { label: 'Pricing', component: 'pricing' },
]

export const NavBar: FC<NavBarProps> = ({ className }) => {
    const [active, setActive] = useState<string>()
    const [position, setPosition] = useState<number>()
    const activeComponent = MENU_ITEMS.find((i) => i.label === active)
    const activeIndex = MENU_ITEMS.findIndex((i) => i.label === active)

    const { ref, height = 0 } = useResizeObserver()

    return (
        <div className={classnames(' font-bold relative', className)} onMouseLeave={() => setActive('')}>
            <div className="flex space-x-6 w-full">
                {MENU_ITEMS.map((item, i) => (
                    <div
                        className="hover:text-gray-300 cursor-pointer transition-colors"
                        key={item.label}
                        onMouseEnter={(e) => {
                            setActive(item.label)
                            const offset = (e.target as HTMLElement).offsetLeft
                            const width = (e.target as HTMLElement).clientWidth
                            setPosition(offset + width / 2)
                        }}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {activeComponent && (
                    <div className="absolute w-full flex justify-center pt-[20px]">
                        <motion.span
                            className="block w-[10px] h-[8px] absolute left-0 top-[calc(20px-8px)] border-t-transparent border-x-transparent border-b-white border-t-0 border-x-[10px]"
                            animate={{ opacity: 1, borderBottomWidth: '8px', x: position }}
                            initial={{ opacity: 0, borderBottomWidth: '0px', x: position }}
                            exit={{ opacity: 0, borderBottomWidth: '0px' }}
                            transition={{
                                duration: 0.2,
                            }}
                        />
                        <motion.div
                            className="absolute w-[120%] top-full bg-white rounded-lg shadow-lg text-gray-700 origin-top overflow-hidden"
                            animate={{ opacity: 1, rotateX: 0, height }}
                            initial={{ opacity: 0, rotateX: -5 }}
                            exit={{ opacity: 0, rotateX: -5 }}
                            transformTemplate={({ rotateX }) => {
                                return `perspective(1000px) rotateX(${rotateX})`
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <div ref={ref} className="flex">
                                {MENU_ITEMS.map(({ component, label }, i) => {
                                    const isActive = label === active
                                    return (
                                        <motion.div
                                            className="p-6"
                                            animate={isActive ? 'center' : i > activeIndex ? 'right' : 'left'}
                                            key={label}
                                            initial={false}
                                            variants={{
                                                center: {
                                                    opacity: 1,
                                                    x: 0,
                                                    position: 'relative',
                                                    zIndex: 2
                                                },
                                                left: {
                                                    opacity: 0,
                                                    x: -50,
                                                    position: 'absolute',
                                                },
                                                right: {
                                                    opacity: 0,
                                                    x: 50,
                                                    position: 'absolute',
                                                },
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            {component}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
