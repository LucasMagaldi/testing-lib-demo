import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Register from "./Register";

describe("Register Component", () => {
    it("should render Register component correctly", () => {
        render(<Register />);

        const alertElement = screen.queryByRole("alert");
        expect(alertElement).not.toBeInTheDocument();

        const element = screen.getByRole("title");
        expect(element).toBeInTheDocument();
        ;;screen.debug()
    });

    it("should show error message when all the fields are not entered", async () => {
        render(<Register />);
        const buttonElement = screen.getByRole("onSubmitButton");
        await userEvent.click(buttonElement);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
    });

    it("should showns sucess message when the registration in completed without alert", async () => {
        render(<Register />);

        const name = screen.getByRole("textbox", { name: /name/i });
        await act (async () => {
            fireEvent.change(name, {
                target: {
                    value: "Lucas"
                }
            })
        });
        
        const email = screen.getByRole("textbox", { name: /email/i });
        await act (async () => {
            fireEvent.change(email, {
                target: {
                    value: "userTest@gmail.com"
                }
            });       
        });
        //const password = screen.getByRole("textbox", { name: /password/i });
        expect(name).toHaveValue("Lucas");
        expect(email).toHaveValue("userTest@gmail.com");
    });

})