import PropTypes from 'prop-types';

const HeaderCatatan = ({ title }) => {
    return (

        <div className="relative flex flex-row items-center md:gap-12 gap-4 mt-12 bg-gradient-to-r from-sky-400 via-cyan-600 to-sky-950 rounded-[20px]">
            <img src="/avatar_man.svg" className="md:w-64 w-44 md:-mt-12 md:-ml-20 -ml-12" />
            <img src="/books.svg" className="md:w-36 w-24 absolute md:left-40 left-36 md:-top-4 top-[8px] -mt-12 -ml-20" />
            <div className="text-center text-white md:text-[45px] text-[24px] font-bold font-['Poppins']">{title}</div>
        </div>

    );
};

HeaderCatatan.propTypes = {
    title: PropTypes.string,
    style: PropTypes.string,
};

export { HeaderCatatan };