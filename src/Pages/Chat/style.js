import styled from "styled-components"

export const WrapperMessage = styled.div`

    &.my-message {
        display: flex;
        justify-content: flex-end;

        .wrapper {
            background-color: #2a9d8f;
        }
    }

    .wrapper {
        border-radius: 18px;
        padding: 0.5rem;
        margin: 0.25rem;
        background-color: white;
        min-width: 80px;
        max-width: 60%;
        width: fit-content;

        p.name {
            font-size: 0.85rem;
            font-weight: 700;
        }
        
        p {
            margin-bottom: 0;
            word-wrap: break-word;
        }

        .datetime {
            font-size: 0.7rem;
            text-align: end;
        }
    }
`;

export const WrapperUserRoom = styled.div``;

const WrapperChat = styled.div`
    
    overflow-x: auto;

    main {
        min-width: 1056.590px;
        display: flex;

        .control {
            width: 430.312px;
            height: calc(100vh - 65px);

            .card {
                height: 100%;
                border-radius: 0;
                background-color: var(--color-main);
                .card-header {
                    display: flex;

                    button {
                        width: 100%;
                        border-radius: 18px;
                        background-color: var(--color-gray);

                        &.active {
                            background-color: var(--color-primary);
                        }

                        &:nth-child(2) {
                            margin: 0 0.7rem;
                        }
                    }
                }

                .card-body {
                    padding: 0;

                    .list-of-chats {
                        list-style-type: none;
                        padding: 0;
                        overflow-y: auto;
                        height: calc(100vh - 135px);

                        li {

                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            color: white;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.175);
                            padding: 1rem;

                            button {
                                padding: 0;
                                background-color: unset;

                                svg {
                                    font-size: 1.25rem;
                                }
                            }

                            &.favorite {
                                button {
                                    svg {
                                        color: yellow;
                                    }
                                }
                            }

                            &.active {
                                background-color: var(--color-primary);
                            }

                            &:not(.active):hover {
                                background-color: var(--color-primary);
                                opacity: 0.7;
                                cursor: pointer;
                            }
                        }

                    }
                }
            }
        }

        .messages {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: var(--color-light);
            background-image: url("./background-image-chat.png");
            padding: 0;
            height: calc(100vh - 65px);
            width: calc(100% - 430.312px);

            .list-messages {
                overflow-y: auto;

                    .info {
                        text-align: center;
                        font-size: 1.3rem;
                        padding: 0.25rem;
                        margin: 0;
                    }
            }

            .send-message {
                background-color: #F0F2F5;
                padding: 0.5rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .container-emoticon {
                    position: relative;

                    button svg {
                        margin-left: 0 !important;
                        margin-right: 0.55rem;
                    }

                    &.btn-emoticon {
                        position: relative;

                        &.hidden .EmojiPickerReact {
                            display: none;
                        }
                    }
                }

                .EmojiPickerReact {
                    position: absolute;
                    bottom: 3.5rem;
                    box-shadow: 0 2px 5px 0 rgba(11,20,26,.26),0 2px 10px 0 rgba(11,20,26,.16);
                }

                input {
                    display: inline-block;
                    height: 3rem;
                }

                .btn {
                    padding: 0;
                    background-color: unset;
                    color: unset;
                }

                svg {
                    font-size: 1.5rem;
                    margin-left: 0.85rem;
                }
            }
        }
    }
`;

export default WrapperChat;