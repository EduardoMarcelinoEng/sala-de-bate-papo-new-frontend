import styled from "styled-components";

const WrapperMyProfile = styled.div`
    form {
        svg.warning {
            color: orange;
            margin-left: 0.7rem;
        }

        button {
            &:hover {
                opacity: 0.85;
            }

            &.save {
                background-color: var(--color-primary);

                &:active {
                    background-color: var(--color-primary);
                }
            }

            &.cancel {
                background-color: unset;
                color: var(--color-font);

                &:active {
                    background-color: unset;
                    color: var(--color-font);
                }
            }
        }
    }
`;

export default WrapperMyProfile;