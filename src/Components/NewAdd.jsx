import styled from "styled-components";

const NewAdd = () => {
  return (
    <StyledWrapper>
      <button className="icon-btn add-btn">
        <div className="add-icon" />
        <div className="btn-txt">Add Photo</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .icon-btn {
    width: 50px;
    height: 50px;
    border: 1px solid #cdcdcd;
    background: white;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    transition: width 0.2s ease-in-out;
    font-weight: 500;
    font-family: inherit;
  }

  .add-btn:hover {
    width: 120px;
  }

  .add-btn::before,
  .add-btn::after {
    transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
    content: "";
    position: absolute;
    height: 4px;
    width: 10px;
    top: calc(50% - 2px);
    background: #1e90ff; /* Changed to blueish tone */
  }

  .add-btn::after {
    right: 14px;
    overflow: hidden;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .add-btn::before {
    left: 14px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .icon-btn:focus {
    outline: none;
  }

  .btn-txt {
    opacity: 0;
    transition: opacity 0.2s;
  }

  .add-btn:hover::before,
  .add-btn:hover::after {
    width: 4px;
    border-radius: 2px;
  }

  .add-btn:hover .btn-txt {
    opacity: 1;
  }

  .add-icon::after,
  .add-icon::before {
    transition: all 0.2s ease-in-out;
    content: "";
    position: absolute;
    height: 20px;
    width: 2px;
    top: calc(50% - 10px);
    background: #1e90ff; /* Changed to blueish tone */
    overflow: hidden;
  }

  .add-icon::before {
    left: 22px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .add-icon::after {
    right: 22px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .add-btn:hover .add-icon::before {
    left: 15px;
    height: 4px;
    top: calc(50% - 2px);
  }

  .add-btn:hover .add-icon::after {
    right: 15px;
    height: 4px;
    top: calc(50% - 2px);
  }
`;

export default NewAdd;
