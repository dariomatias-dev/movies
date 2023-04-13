import styles from "../../styles/Loading.module.css";

const maxWidth = 220;
const maxHeight = 220;
const style = `absolute flex justify-center items-center border-[3px] border-l-transparent border-r-transparent rounded-full`;
const borderColorOne = "border-zinc-400";
const borderColorTwo = "border-gray-600";

const Loading = () => {
    return (
        <div className="flex justify-center items-center my-28">
            <div
                style={{
                    width: `${maxWidth}px`,
                    height: `${maxHeight}px`,
                }}
                className="relative flex justify-center items-center"
            >
                <div
                    style={{
                        width: `${maxWidth}px`,
                        height: `${maxHeight}px`,
                    }}
                    className={`${styles.rotationOne} ${style} ${borderColorOne}`}
                />

                <div
                    style={{
                        width: `${maxWidth - 20}px`,
                        height: `${maxHeight - 20}px`,
                    }}
                    className={`${styles.rotationTwo} ${style} ${borderColorTwo}`}
                />

                <div
                    style={{
                        width: `${maxWidth - 40}px`,
                        height: `${maxHeight - 40}px`,
                    }}
                    className={`${styles.rotationOne} ${style} ${borderColorOne}`}
                />

                <div
                    style={{
                        width: `${maxWidth - 60}px`,
                        height: `${maxHeight - 60}px`,
                    }}
                    className={`${styles.rotationTwo} ${style} ${borderColorTwo}`}
                />

                <span className="text-xl">Carregando...</span>
            </div>
        </div>
    );
};

export default Loading;
