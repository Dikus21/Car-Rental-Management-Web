import React, { FC } from 'react';

interface CarDeleteModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  handleDelete: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CarDeleteModal: FC<CarDeleteModalProps> = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete
}) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setShowDeleteModal(false);
    }
  };
  return (
    showDeleteModal && (
      <div
        className="modal d-flex justify-content-center align-items-center"
        id="carDeleteModal"
        onClick={handleClickOutside}>
        <div className="modal-content-delete">
          <img src="/assets/images/img-BeepBeep.png" width="153" height="121" />
          <p>
            <b>Menghapus Data Mobil</b>
          </p>
          <p className="text-center">
            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
          </p>
          <form className="d-flex flex-col" onSubmit={handleDelete}>
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="confirmDeleteBtn btn btn-dark-blue text-light px-5">
                  Yes
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="cancelBtn btn btn-outline-primary fw-bold border-1 px-5"
                  onClick={() => setShowDeleteModal(false)}>
                  No
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CarDeleteModal;
