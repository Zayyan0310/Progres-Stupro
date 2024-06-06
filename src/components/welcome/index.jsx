import PropTypes from 'prop-types';
import { Image } from '@/components';

const WelcomeAuth = ({ title }) => {
    return (
        <div className="flex flex-col md:w-[60%] w-[100%]  md:p-8 p-8 justify-center items-center bg-gradient-to-br from-sky-400 via-cyan-600 to-sky-950">
            <div className="flex-col gap-[31px] inline-flex">
                <div className="text-white text-[30px] hidden md:block md:text-[70px] font-bold font-['Poppins'] leading-[70px]">Selamat Datang <br />di STUPRO</div>
                <div className="text-white text-[30px] block md:hidden md:text-[70px] font-bold font-['Poppins']">Selamat Datang di STUPRO</div>
                <div className="text-white text-base font-medium font-['Poppins']">{title || "Masuk untuk mengakses akun Anda"}</div>
            </div>
            <div className="w-[50%]">
                <Image src="/img_login.svg" style="" />
            </div>
        </div>
    )
}

WelcomeAuth.propTypes = {
    title: PropTypes.string,
};

export { WelcomeAuth };