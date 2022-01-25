import React from "react"
import { useFormik } from "formik"
import { Container, Row, Col, FormGroup, Form } from "react-bootstrap"

function NewProduct() {
  const formik = useFormik({
    initialValues: { name: "" },
    validate: (values) => {
      const errors = {}
      if (!values.name) {
        errors.name = "Required"
      }
      return errors
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values))
    },
  })

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="Product Name"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback>Bien</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </FormGroup>

            <button type="submit">Agregar Product</button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewProduct
