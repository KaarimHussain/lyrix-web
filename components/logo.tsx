import Image, { ImageProps } from 'next/image';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
    className?: string;
    text?: string;
    textClassName?: string;
    containerClassName?: string;
    showText?: boolean;
}

export default function Logo({ className, containerClassName, textClassName, text, width = 40, height = 40, showText = true, ...props }: LogoProps) {
    return (
        <div className={`flex items-center ${containerClassName || ''}`}>
            <Image
                src="/images/Logo.png"
                alt="Logo"
                width={width}
                height={height}
                className={className}
                {...props}
            />
            {text && (
                <span className={`text-3xl font-bold font-sans tracking-tight transition-all duration-300 transform ${showText ? "opacity-100 translate-x-0 w-auto ml-2" : "opacity-0 -translate-x-2 w-0 overflow-hidden"} ${textClassName || ''}`}>
                    {text}
                </span>
            )}
        </div>
    );
}