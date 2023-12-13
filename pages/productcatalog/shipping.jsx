import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { decryptId } from "../../apiCalls/index";
import router from "next/router";
import CommonLayout from "../../layouts/CommonLayout";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import SubMenu from "../../components/submenu/SubMenu";
const logo = require("../../images/final.png");

function DashboardContent({ order_number }) {

  let final = decryptId(order_number);

  return (
    <CommonLayout>
      <Box>
        <SubMenu activeVal={3} />
      </Box>
      <Container>
        <Box>
          <Grid container>
            <Grid container direction="row" justifyContent="center">
              <Grid item xs={5}>
                <div style={{marginTop:'30px'}}>
                  <img src={logo} style={{width:'400px'}} alt="logo" />
                </div>
              </Grid>

              <Grid item xs={7}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    marginTop:'70px'
                  }}
                >
                  <h4
                    align="center"
                    style={{
                      textTransform: "capitalize",
                      letterSpacing: "1px",
                      marginBottom: "25px",
                    }}
                  >
                    Hurry!! Your Order is Placed Successfully!
                  </h4>
                  <p style={{ marginTop: "4px" }}>
                    A confirmation has sent to your email against your
                    fillokart Order{" "}
                    <span style={{ fontWeight: "600" }}>
                      {final}
                    </span>
                  </p>
                  <p>Thanks again for making this purchase.</p>
                  <p>We appreciate your business!</p>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push("/productcatalog")}
                sx={{mt:5}}
              >
                Continue shopping
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </CommonLayout>
  );
}

export async function getServerSideProps({ query }) {
 
  let order_number = query.id;

  return {
    props: {
      order_number
    },
  };
}

export default DashboardContent;
