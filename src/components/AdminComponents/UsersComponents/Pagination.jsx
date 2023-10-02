import { Box, Button } from "@chakra-ui/react";

const Pagination = ({ currentPage, onPageChange, totalPageCount }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={"1rem"}
      marginTop={"2rem"}
      marginBottom={"2rem"}
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        colorScheme="facebook"
      >
        Previous
      </Button>
      {Array.from({ length: totalPageCount }).map((_, i) => (
        <Button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          isActive={currentPage === i + 1}
          colorScheme="facebook"
        >
          {i + 1}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPageCount}
        colorScheme="facebook"
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
