import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Alert } from "../../../components/Status";

import { GetSpiritusById } from "../../../service/http/spiritus";
import { DeleteSpiritusModal } from "../../../components/forms/editSpiritus/EditSpiritus";
import { EditorLayout } from "../../../components/forms/editSpiritus/Layout";
import { EditContent } from "../../../components/forms/editSpiritus/EditContent";
import { EditImages } from "../../../components/forms/editSpiritus/EditImages";

export default function EditSpiritusPage({ spiritus }) {
  const { t } = useTranslation("common");
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedMenuId, setSelectedMenuId] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onDelete() {
    openModal();
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
    setIsSuccess(false);
  };

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  function selectEditor() {
    switch (selectedMenuId) {
      case 1:
        return (
          <EditImages
            spiritus={spiritus}
            onError={onError}
            onSuccess={onSuccess}
          />
        );
      default:
        return (
          <EditContent
            spiritus={spiritus}
            onError={onError}
            onSuccess={onSuccess}
          />
        );
    }
  }

  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("edit_spiritus_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_spiritus_meta_desc")} />
      </Head>
      <DeleteSpiritusModal
        deleteId={spiritus.id}
        isOpen={isOpen}
        closeModal={closeModal}
      />

      <div className="relative py-5 min-h-screen mb-64">
        {toastOpen && (
          <div className="z-50 sticky top-8 right-0 mb-5">
            <div className="flex justify-end">
              <Alert
                isSuccess={isSuccess}
                message={toastMessage}
                onClick={clearToast}
              />
            </div>
          </div>
        )}
        <EditorLayout
          menuId={selectedMenuId}
          setMenuId={setSelectedMenuId}
          onDelete={onDelete}
        >
          {selectEditor()}
        </EditorLayout>
      </div>
    </LayoutNoFooter>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const { data: spiritus } = await GetSpiritusById(id);

    if (!spiritus || !spiritus?.users) {
      throw "missing spiritus data";
    }

    for (const su of spiritus.users) {
      if (su.email === session.user.email && su.code === session.user.code) {
        return {
          props: {
            spiritus,
            ...(await serverSideTranslations(context.locale, [
              "common",
              "settings",
              "auth",
            ])),
          },
        };
      }
    }

    // user does not have access - redirect to previous page
    return {
      redirect: {
        destination: context.req.headers.referer || "/",
        permanent: false,
      },
    };
  } catch (err) {
    console.log("error fetching spiritus\n", err);
    // redirect to home in case of err
    // known errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
