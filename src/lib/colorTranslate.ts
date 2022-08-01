export default function colorTranslate(color: string | number): string {
    switch (color) {
        case 0:
        case "노랑":
            return "yellow";

        case 1:
        case "주황":
            return "orange";

        case 2:
        case "검정":
            return "black";

        case 3:
        case "빨강":
            return "red";

        case 4:
        case "보라":
            return "purple";

        case 5:
        case "초록":
            return "green";

        case 6:
        case "파랑":
            return "blue";

        case 7:
        case "회색":
            return "grey";

        default:
            return `${color}`;
    }
}
