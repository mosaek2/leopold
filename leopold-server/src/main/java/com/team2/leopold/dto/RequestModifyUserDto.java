package com.team2.leopold.dto;

public class RequestModifyUserDto {
    private String password;
    private String name;
    private String zipcode;
    private String address;
    private String addressDetail;
    private String phoneAlt;
    private String phone;
    private String email;
    private String agreeSmsYn;
    private String agreeEmailYn;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getPhoneAlt() {
        return phoneAlt;
    }

    public void setPhoneAlt(String phoneAlt) {
        this.phoneAlt = phoneAlt;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAgreeSmsYn() {
        return agreeSmsYn;
    }

    public void setAgreeSmsYn(String agreeSmsYn) {
        this.agreeSmsYn = agreeSmsYn;
    }

    public String getAgreeEmailYn() {
        return agreeEmailYn;
    }

    public void setAgreeEmailYn(String agreeEmailYn) {
        this.agreeEmailYn = agreeEmailYn;
    }
}