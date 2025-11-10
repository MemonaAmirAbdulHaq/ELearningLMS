import React from "react";
import { Modal, Box } from "@mui/material";
type Props = {
  open: boolean;
  activeItem: unknown;
  component: any;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
  refetch?: any;
};
const CustomModal = ({
  open,
  setOpen,
  activeItem,
  setRoute,
  component: Component,
  refetch,
}: Props) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] max-h-[95vh] overflow-y-auto left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] 400px:w-[90%] 800px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
