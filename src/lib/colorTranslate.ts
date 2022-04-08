export default function colorTranslate(color: string) {
    switch (color) {
        case "노랑":
            return "yellow";

        case "주황":
            return "orange";

        case "검정":
            return "black";

        case "빨강":
            return "red";

        case "보라":
            return "purple";

        case "초록":
            return "green";

        case "파랑":
            return "blue";

        default:
            return color;
    }
}
