interface CustomToastErrorProps {
  title: string;
  message: string;
  specialText?: string;
}

const CustomToastError = ({
  title,
  message,
  specialText,
}: CustomToastErrorProps) => {
  // console.log("asdasdasdgfg  adsas: ", specialText);
  return (
    <div
      style={{
        color: "red",
        padding: "16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "8px" }}>
        <h2 style={{ fontSize: 24 }}>{title}</h2>
        <p style={{ color: "black" }}>{message}</p>
        {specialText !== undefined && specialText.length > 0 && (
          <>
            <span
              style={{
                fontWeight: "700",
                color: "red",
                textDecorationStyle: "wavy",
                fontSize: 20,
              }}
            >
              {specialText}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomToastError;
